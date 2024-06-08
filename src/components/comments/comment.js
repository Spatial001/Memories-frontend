import React, { useState, useRef } from 'react'
import Moment from 'react-moment';
import Typography from '@mui/material/Typography';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import IconButton from '@mui/material/IconButton';
import ReplyIcon from '@mui/icons-material/Reply';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useLayoutEffect } from 'react';
import { commentDownvote, commentUpvote } from "../../api";
import { replyOnComment } from '../../actions/post';
import { useDispatch } from 'react-redux';
import * as api from "../../api"


import './comment.css'
const Comment = ({ cmt, replyDepth, replies, classname }) => {
    const dispatch = useDispatch();

    function replyoncomment() {
        console.log(replymsg);
        console.log(cmt);
        let formdata = {
            msg: replymsg,
            commentID: cmt._id
        }
        setReplyOpen(!replyOpen)
        dispatch(replyOnComment(formdata));
    }

    const [id, setid] = useState("")
    const [defCom, setDefCom] = useState(cmt)
    const [replymsg, setreplymsg] = useState("");
    const [commentreplies, setcommentreplies] = useState([]);
    useLayoutEffect(() => {
        async function loc() {
            setid(localStorage.getItem('id'));
            if (cmt.comments.length > 0) {
                const p = {
                    comments: cmt.comments
                }
                const data = await api.fetchcomments(p);
                setcommentreplies(data.data.comments);
            }
        }

        loc()

    }, []);
    async function commenttvote(str) {
        let formdata = {
            voteID: cmt._id
        }
        console.log("called");
        if (str === "down") {
            const data = await commentDownvote(formdata);
            setDefCom(data.data.comment)
            console.log(data);
        }
        else {

            const data = await commentUpvote(formdata);

            setDefCom(data.data.comment)
            console.log(data);

        }
    }
    const [replyOpen, setReplyOpen] = useState(false)
    const myRef = useRef(null)

    const reply = <div className='reply' ref={myRef}>
        <TextField
            id="outlined-multiline-static"
            label="Reply"
            multiline
            rows={4}
            style={{ width: "100%", float: "right", margin: "5px 0px 10px 0px" }}
            sx={{
                "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                        borderColor: "#c4c4c4",
                    }
                },
                "& .MuiOutlinedInput-root:hover": {
                    "& > fieldset": {
                        borderColor: "#c4c4c4"
                    }
                },
                "& label.Mui-focused": {
                    color: "gray",
                }
            }}
            value={replymsg}
            onChange={(e) => { setreplymsg(e.target.value) }}
        />
        <div className='replyBTNS'>
            <Button variant="text" onClick={() => { setReplyOpen(!replyOpen) }}>Cancel</Button>
            <Button variant="text" onClick={() => { replyoncomment() }}>Reply</Button>
        </div>
    </div>
    const executeScroll = () => myRef.current.scrollIntoView(false)

    return (
        <div className={classname} style={{ marginLeft: "8px" }} >
            <div className="commentHeader">
                <Typography style={{ fontWeight: "500", }} >Anon#{defCom.userID.substr(defCom.userID.length - 5)}</Typography>
                <span style={{ marginTop: "0.05rem", wordSpacing: "1rem" }}>
                    <Typography variant='caption' style={{ wordSpacing: "-1px" }} ><Moment fromNow>{defCom.createdAt}</Moment></Typography>
                </span>
            </div>
            <div className="commentMSG">
                <Typography variant='subtitle2' >{defCom?.msg}</Typography>
            </div>
            <div className='replyCommentWrapper'>
                <div className='commentBTNS'>
                    <IconButton onClick={() => commenttvote("up")} aria-label="Upvote" style={{ zIndex: "2", marginRight: "-8px" }}   >
                        {defCom?.upvotes?.includes(id) && !defCom?.downvotes?.includes(id) ? <KeyboardArrowUpIcon
                            style={{ color: "dodgerblue" }}
                        /> :
                            <KeyboardArrowUpIcon/>}
                    </IconButton>
                    <Typography style={{ fontSize: "0.9rem", marginLeft: "0.2rem", marginTop: "0.6rem", zIndex: "1" }} >
                        {defCom.upvotes.length - defCom.downvotes.length}
                    </Typography>
                    <IconButton onClick={() => commenttvote("down")} aria-label="Downvote" style={{ zIndex: "2", marginLeft: "-8px" }}   >
                        {defCom?.downvotes?.includes(id) && !defCom?.upvotes?.includes(id) ? <KeyboardArrowDownIcon
                            style={{ color: "red" }}


                        /> :
                            <KeyboardArrowDownIcon


                            />}
                    </IconButton>
                    <IconButton >
                        <BookmarkIcon />
                        <Typography style={{ fontSize: "0.9rem", marginLeft: "0.2rem", marginTop: "0.1rem", zIndex: "1" }} >
                            Save
                        </Typography>
                    </IconButton>
                    <IconButton onClick={async () => {
                        await setReplyOpen(!replyOpen);
                        !replyOpen && executeScroll();

                    }}>
                        <ReplyIcon />
                        <Typography style={{ fontSize: "0.9rem", marginLeft: "0.2rem", marginTop: "0.1rem", zIndex: "1" }} >
                            Reply
                        </Typography>
                    </IconButton>

                </div>
                {replyOpen ? reply : ""}
                {commentreplies.length > 0 ? commentreplies?.map((comment) => {

                    return (<Comment cmt={comment} classname="comment" replyDepth={replyDepth + 1} replies={true} key={comment._id} />)
                }) : ""}
            </div>

        </div>
    )
}

export default Comment;