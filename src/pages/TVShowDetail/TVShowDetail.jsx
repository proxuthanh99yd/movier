import { useParams } from "react-router-dom";
import { Info, SectionIcon, TrailerVideo } from "../../components/common";
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
import { styled } from "styled-components";
const IMG_URL = import.meta.env.VITE_IMAGES_URL;

export default function TVShowDetail() {
    const { id } = useParams();
    const { isLogin } = useLogin();
    const { data, isLoading } = useQuery({
        queryKey: [`tv-${id}`],
        queryFn: async () => {
            if (!id) return;
            const tvRes = await fetchApi(`/tv/${id}?language=en-US`);
            const creditsRes = await fetchApi(
                `/tv/${id}/credits?language=en-US`
            );
            const videoRes = await fetchApi(`/tv/${id}/videos?language=en-US`);
            const imageRes = await fetchApi(`/tv/${id}/images`);
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
                tvs: tvRes.data,
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
            queryClient.invalidateQueries({ queryKey: [`tv-${id}`] });
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
    const { tvs, comments, credits, images, video } = data || {};
    console.log(video);
    return (
        <Wrapper>
            <div className="over-lay">
                <img
                    className="over-lay-img"
                    src={IMG_URL + "w1280" + tvs.backdrop_path}
                    alt=""
                />
                <TrailerVideo videoId={video} />
                <SectionIcon star={tvs.vote_average} />
            </div>
            <div className="tv-content">
                <h2>{tvs.title}</h2>
                <p>{tvs.overview}</p>
                <Info
                    director={
                        credits.crew
                            ? credits.crew?.filter(
                                  (crew) => crew["job"] === "Director"
                              ).length > 0
                                ? credits.crew?.filter(
                                      (crew) => crew["job"] === "Director"
                                  )
                                : credits.crew?.filter(
                                      (crew) => crew["job"] === "Novel"
                                  )
                            : ""
                    }
                    revenue={tvs.revenue}
                    originalTitle={tvs.original_title || tvs.name}
                />
            </div>
            <PeopleCarousel data={credits?.cast} />
            <Comment
                comments={comments}
                isLogin={isLogin}
                onComment={onComment}
            />
            <Poster images={images} />
        </Wrapper>
    );
}

const Wrapper = styled.div`
    margin-top: -52px;
    .over-lay {
        width: 100%;
        height: 100vh;
        position: relative;
        .over-lay-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: brightness(0.3);
        }
    }
    .tv-content {
        margin-top: 42px;
        h2 {
            margin: auto;
            text-align: center;
            width: 812px;
            color: #fcfcfc;
            font-size: 48px;
            font-style: normal;
            font-weight: 700;
            line-height: 125.188%; /* 60.09px */
        }
        p {
            text-align: center;
            margin: auto;
            margin-top: 20px;
            width: 507px;
            color: #fdfdfd;
            font-size: 18px;
            font-style: normal;
            font-weight: 400;
            line-height: 137.687%; /* 24.784px */
        }
    }
`;
