import { useEffect, useState } from "react"
import {useParams} from "react-router-dom";
import { getArticle, getComments, patchVotes, postComment, patchCommentVote, deleteArticle} from "../utils/api";


const SingleArticle = ({User}) => {
const [ articleData , setArticleData] = useState([])
const [ CommentData , setCommentData] = useState([])
const [ Votes, setVotes] = useState(0)
const [ VoteChange , setVoteChange] = useState(0)
const [ Error, SetError ] = useState(false)
const [commentText, setCommentText] = useState('')
const {article_id} = useParams()
const [isError, setIsError] = useState(false)


const CommentVote = ({comment}) => {
    const [ CommentVoteChange , setCommentVoteChange] = useState(0)
    const handleCommentVote = (e) => {
        setCommentVoteChange((currVote) => { return currVote += 1})
        patchCommentVote(e.target.value)
        .catch((err)=>{
            console.dir(err)
            setCommentVoteChange((currVote) => { return currVote -= 1}); 
        })
    }

    return (
    <section className = "comment-meta2">
    <label htmlFor="add-vote" className="label"> Up-Vote: </label> 
     <button disabled={!User} id="add-vote" value={comment.comment_id} onClick={handleCommentVote}> {comment.votes + CommentVoteChange}</button>
     {Error ? <span> Please Try Again </span> : null}
     </section>
     )
}

const ArticleDelete = ({articleData}) => {  
    const [CheckUser, setCheckUser] = useState(false)
    const handleDelete = (e) => {
        e.preventDefault()
        deleteArticle(article_id)
    }

    useEffect(()=> {
        if (articleData.author === JSON.parse(User)) {
            setCheckUser(true)
        } else {
            setCheckUser(false)
        }
    }, [articleData])

    return (
    <button onClick={handleDelete} className="delete-button" disabled={!CheckUser} value={articleData.article_id}> Delete Article </button>
    )
}

    useEffect(() => {
        setIsError(false)
        getArticle(article_id).then((articleData)=> {
        setArticleData(articleData)
        setVotes(articleData.votes)
        })
        .catch((err) => {
            setIsError(true)
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
        postComment(commentText, article_id, User)
        setCommentText('')
    }


    return (
        <div>
        {isError ? <p> 404 - No found </p> : null}
        <section className="article">
        <section className="metadata">
        <p> Topic: {articleData.topic}</p>
        <p> Author: {articleData.author}</p>
        <p> Published: {new Date(articleData.created_at).toUTCString()}</p>
        <label htmlFor="add-vote" className="label">Up-Vote: </label> 
        <button  disabled={!User} id="add-vote" onClick={handleVote}>{ Votes + VoteChange }</button>
        {Error ? <span> Please Try Again </span> : null}
        </section>
            <h2 className="title">{articleData.title}</h2>
            <ArticleDelete User={User} articleData={articleData}/>
            <p className="article-body">{articleData.body}</p>
        </section>
        <form className="comment-input" onSubmit={handleComment}>
        <label htmlFor="comment-input" className="label"> Add a Comment</label>
        <input type='text' onChange={((e)=>{setCommentText(e.target.value)})} value={commentText} id='comment-input'></input>
        <button  disabled={!User} type='submit'> Post Comment </button>
        </form>
        <section className ="comments">
            <h3> Comments</h3>
            <ul>
            {CommentData.map((comment) => {
                return(
                    <li className="comment-list" key={comment.comment_id}>
                    <p className="comment-meta1">{comment.author}</p>
                    < CommentVote comment={comment} />
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