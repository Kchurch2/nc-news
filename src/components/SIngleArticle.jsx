import { useEffect, useState } from "react"
import {useParams} from "react-router-dom";
import { getArticle, getComments, patchVotes, postComment} from "../utils/api";

const SingleArticle = () => {
const [ articleData , setArticleData] = useState([])
const [ CommentData , setCommentData] = useState([])
const [ Votes, setVotes] = useState(0)
const [ VoteChange , setVoteChange] = useState(0)
const [ Error, SetError ] = useState(false)
const [commentText, setCommentText] = useState('')

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
    }, [article_id, commentText])

    const handleVote = () => {
        SetError(false)
        setVoteChange((currVote) => { return currVote += 1});
        patchVotes(articleData.article_id).catch(()=>{
            SetError(true)
            setVoteChange((currVote) => { return currVote -= 1}); 
        })
    }

    const handleComment = (e) => {
        e.preventDefault()
        postComment(commentText, article_id)
        setCommentText('')
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
        {Error ? <span> Please Try Again </span> : null}
        </section>
            <h2 className="title">{articleData.title}</h2>
            <p className="article-body">{articleData.body}</p>
        </section>
        <form className="comment-input" onSubmit={handleComment}>
        <label htmlFor="comment-input" className="label"> Add a Comment</label>
        <input type='text' onChange={((e)=>{setCommentText(e.target.value)})} value={commentText} id='comment-input'></input>
        <button type='submit'> Post Comment </button>
        </form>
        <section className ="comments">
            <h3> Comments</h3>
            <ul>
            {CommentData.map((comment) => {
                return(
                    <li className="comment-list" key={comment.comment_id}>
                    <p className="comment-meta1">{comment.author}</p>
                    <p className="comment-meta2"> Votes: {comment.votes}</p>
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