import PropTypes from "prop-types";
function Card({ person }) {
    return (
        <div className="card-wrapper">
            <img
                src={
                    import.meta.env.VITE_IMAGES_URL +
                    "w185" +
                    person.profile_path
                }
                alt={person.original_name}
                className="card-image"
            />
            <div className="rectangle" data={person.original_name} />
        </div>
    );
}

Card.propTypes = {
    person: PropTypes.object,
};

export default Card;
