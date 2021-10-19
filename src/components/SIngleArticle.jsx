import { useEffect, useState } from "react"
import {useParams} from "react-router-dom";
import { getArticle, getComments, patchVotes} from "../utils/api";

const SingleArticle = () => {
const [ articleData , setArticleData] = useState([])
const [ CommentData , setCommentData] = useState([])
const [ Votes, setVotes] = useState(0)
const [ VoteChange , setVoteChange] = useState(0)
const [ Error, SetError ] = useState(false)

const {article_id} = useParams()

    useEffect(() => {
        getArticle(article_id).then((articleData)=> {
        setArticleData(articleData)
        setVotes(articleData.votes)
        })
    }, [article_id])

    useEffect(() => {
        getComments(article_id).then((commentData)=> {
        setCommentData(commentData)
        })
    }, [article_id])

    const handleVote = () => {
        SetError(false)
        setVoteChange((currVote) => { return currVote += 1});
        patchVotes(articleData.article_id).catch(()=>{
            SetError(true)
            setVoteChange((currVote) => { return currVote -= 1}); 
        })
    }
    return (
        <div>
        <section className="article">
        <section className="metadata">
        <p> Topic: {articleData.topic}</p>
        <p> Author: {articleData.author}</p>
        <p> Published: {new Date(articleData.created_at).toUTCString()}</p>
        <label htmlFor="add-vote" className="label">Up-Vote: </label> 
        <button id="add-vote" onClick={handleVote}>{ Votes + VoteChange }</button>
        </section>
            <h2 className="title">{articleData.title}</h2>
            <p className="article-body">{articleData.body}</p>
        </section>
        <section className="comment-input">
        <label htmlFor="comment-input" className="label"> Add a Comment</label>
            <input></input>
        </section>
        <section className ="comments">
            <h3> Comments</h3>
            <ul>
            {CommentData.map((comment) => {
                return(
                    <li className="comment-list" key={comment.comment_id}>
                    <p className="comment-meta1">{comment.author}</p>
                    <p className="comment-meta2">{comment.votes}</p>
                    <p className="comment-meta3">{new Date(comment.created_at).toUTCString()}</p>
                    <p className="comment-body">{comment.body}</p>
                    </li>
                )
            })}
            </ul>
        </section>
        </div>
    )
}

export default SingleArticle