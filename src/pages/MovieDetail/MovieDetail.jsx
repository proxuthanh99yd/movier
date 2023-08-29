import { useParams } from "react-router-dom";
import { Info, SectionIcon, TrailerVideo } from "../../components/common";
import "./DetailPage.scss";
import { fetchApi } from "../../axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Comment, Loading, PeopleCarousel, Poster } from "../../components";
import {
    addDoc,
    collection,
    getDocs,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useLogin } from "../../store";
const IMG_URL = import.meta.env.VITE_IMAGES_URL;

export default function MovieDetail() {
    const { id } = useParams();
    const { isLogin } = useLogin();
    const { data, isLoading } = useQuery({
        queryKey: [`movie-${id}`],
        queryFn: async () => {
            if (!id) return;
            const movieRes = await fetchApi(`/movie/${id}?language=en-US`);
            const creditsRes = await fetchApi(
                `/movie/${id}/credits?language=en-US`
            );
            const videoRes = await fetchApi(
                `/movie/${id}/videos?language=en-US`
            );
            const imageRes = await fetchApi(`/movie/${id}/images`);
            const q = query(
                collection(db, "rate"),
                where("movieId", "==", id),
                orderBy("timestamp", "desc")
            );
            const querySnapshot = await getDocs(q);
            const comments = [];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                comments.push({ ...doc.data(), id: doc.id });
            });
            const response = {
                movies: movieRes.data,
                credits: creditsRes.data,
                video: videoRes.data,
                images: imageRes.data,
                comments,
            };
            return response;
        },
    });
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: (input) => {
            if (!id) return;
            addDoc(collection(db, "rate"), {
                comment: input.value,
                vote: 10,
                uid: isLogin,
                movieId: id,
                timestamp: Date.now(),
            });
            return input;
        },
        onSuccess: (input) => {
            if (!id) return;
            input.value = "";
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: [`movie-${id}`] });
        },
    });
    const onComment = (inputRef) => {
        const input = inputRef.current;
        if (!input.value) return;
        mutation.mutate(input);
    };
    if (isLoading) {
        return <Loading />;
    }
    const { movies, comments, credits, images, video } = data || {};
    return (
        <div className="detail-page">
            <div className="over-lay">
                <img
                    className="over-lay-img"
                    src={IMG_URL + "w1280" + movies.backdrop_path}
                    alt=""
                />
                <TrailerVideo videoId={video} />
                <SectionIcon star={movies.vote_average} />
            </div>
            <div className="movie-content">
                <h2>{movies.title}</h2>
                <p>{movies.overview}</p>
                <Info
                    director={
                        credits.crew
                            ? credits.crew?.filter(
                                  (crew) => crew["job"] === "Director"
                              )
                            : ""
                    }
                    revenue={movies.revenue}
                    originalTitle={movies.original_title}
                />
            </div>
            <PeopleCarousel data={credits?.cast} />
            <Comment
                comments={comments}
                isLogin={isLogin}
                onComment={onComment}
            />
            <Poster images={images} />
        </div>
    );
}
