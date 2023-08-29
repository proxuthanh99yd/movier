// import React from 'react'
import PropTypes from "prop-types";

import { styled } from "styled-components";
import { Input, ReviewCard, TitleAvatar } from "../common";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

function Comment({ onComment, isLogin, comments }) {
    const inputRef = useRef(null);
    return (
        <Wrapper className="container">
            <div className="title">
                <p>Write your review</p>
            </div>
            {isLogin ? (
                <div className="comment-form">
                    <TitleAvatar />
                    {/* <Input input={input} setInput={setInput} /> */}
                    <input
                        ref={inputRef}
                        type="text"
                        className="input"
                        placeholder="Type something ...."
                    />
                    <button
                        onClick={() => onComment(inputRef)}
                        className="btn-comment"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="23"
                            viewBox="0 0 25 23"
                            fill="none"
                        >
                            <path
                                d="M2.87305 5.28642L5.73096 10.545C5.98489 11.0122 6.11186 11.2458 6.11186 11.5C6.11186 11.7542 5.98489 11.9878 5.73097 12.455L5.73096 12.455L2.87305 17.7136C1.68572 19.8983 1.09205 20.9906 1.58487 21.5174C2.07768 22.0443 3.20716 21.5247 5.46611 20.4856L21.05 13.317C22.7548 12.5328 23.6071 12.1407 23.6071 11.5C23.6071 10.8593 22.7548 10.4672 21.05 9.68302L5.46611 2.51441C3.20716 1.47529 2.07768 0.955733 1.58487 1.48255C1.09205 2.00938 1.68572 3.10172 2.87305 5.28642Z"
                                stroke="#FDFDFD"
                                strokeWidth="2"
                            />
                        </svg>
                    </button>
                </div>
            ) : (
                <div className="required-login">
                    <Link to={"/login"}>Login</Link> to rate the movie...{" "}
                </div>
            )}
            <div className="comment">
                <div className="action">
                    <p>Filters</p>
                    <button className="btn-most-recent">
                        Most recent
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="19"
                            viewBox="0 0 11 19"
                            fill="none"
                        >
                            <path
                                d="M1.25 1.5L9.25 9.5L1.25 17.5"
                                stroke="#CCD2E3"
                                strokeWidth="2"
                            />
                        </svg>
                    </button>
                    <button className="btn-by-rating">
                        By rating
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="11"
                            height="19"
                            viewBox="0 0 11 19"
                            fill="none"
                        >
                            <path
                                d="M1.25 1.5L9.25 9.5L1.25 17.5"
                                stroke="#CCD2E3"
                                strokeWidth="2"
                            />
                        </svg>
                    </button>
                </div>
                <div className="comments">
                    {comments.map((comment) => (
                        <ReviewCard
                            key={comment.id}
                            {...comment}
                            theme="dark"
                        />
                    ))}
                </div>
            </div>
        </Wrapper>
    );
}

Comment.propTypes = {
    onComment: PropTypes.func,
    isLogin: PropTypes.string,
    comments: PropTypes.array,
};

export default Comment;

const Wrapper = styled.div`
    margin-top: 50px;
    color: #fdfdfd;
    .title {
        p {
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            position: relative;

            &::after {
                content: "";
                position: absolute;
                left: 0;
                bottom: -7.5px;
                display: block;
                width: 48px;
                height: 1.5px;
                background: #ff6b00;
            }
        }
    }
    .required-login {
        margin: auto;
        padding: 30px;
        a {
            color: #ff6b00;
        }
    }
    .comment-form {
        margin-top: 36px;
        padding: 12px 58px;
        display: flex;
        align-items: center;
        gap: 20px;
        .btn-comment {
            cursor: pointer;
            border-radius: 10px;
            border: 2px solid rgba(255, 107, 0, 0.45);
            background: #ff6b00;
            min-width: 81px;
            height: 57px;
            transition: opacity 0.3s ease;
            &:hover {
                opacity: 0.8;
            }
        }
    }
    .comment {
        display: flex;
        gap: 111px;
        .action {
            display: flex;
            flex-direction: column;
            align-items: start;
            p {
                margin-bottom: 41px;
                font-size: 16px;
                font-style: normal;
                font-weight: 700;
                position: relative;
                &::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    bottom: -7.5px;
                    display: block;
                    width: 48px;
                    height: 1.5px;
                    background: #ff6b00;
                }
            }
            button {
                margin-bottom: 30px;
                display: inline-flex;
                border-radius: 10px;
                width: 168px;
                height: 47px;
                border: 1px solid #ff6b00;
                background: transparent;
                color: inherit;
                cursor: pointer;
                justify-content: center;
                align-items: center;
                gap: 31px;
                transition: background 0.3s ease;
                &:hover {
                    background: #ff6a00b5;
                }
            }
        }
        .comments {
            flex: 1;
            height: 941px;
            overflow-y: scroll;
            padding-top: 13px;
        }
        .comments::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            border-radius: 10px;
            background-color: transparent;
        }

        .comments::-webkit-scrollbar {
            width: 12px;
            background-color: transparent;
            width: 9px;
            height: 226px;
        }

        .comments::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
            background-color: #393939;
        }
    }
`;
