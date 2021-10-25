import { useEffect, useState } from "react"
import {useParams, Link} from "react-router-dom";
import { getArticle, getComments, patchVotes, postComment, patchCommentVote, removeArticle} from "../utils/api";

const SingleArticle = ({User}) => {
const [ articleData , setArticleData] = useState([])
const [ CommentData , setCommentData] = useState([])
const [ Votes, setVotes] = useState(0)
const [ VoteChange , setVoteChange] = useState(0)
const [ Error, SetError ] = useState(false)
const [ commentText, setCommentText ] = useState('')
const [ submit, setSubmit ] = useState(false)
const { article_id} = useParams()
const [ isError, setIsError ] = useState(false)
const [ hasVote, setHasVote ] = useState(false)
const [ ChosenSort, setChosenSort ] = useState('created_at')
const [deleteArticle, setDeleteArticle] = useState(false)

const CommentVote = ({comment}) => {
    const [ CommentVoteChange , setCommentVoteChange] = useState(0)
    const [hasVoted, setHasVoted] = useState(false)
    
    const handleCommentVote = (e, num) => {
        setHasVoted(true)
        setCommentVoteChange((currVote) => { return currVote += num})
        patchCommentVote(e.target.value, num)
        .catch((err)=>{
            setCommentVoteChange((currVote) => { return currVote -= num}); 
        })
    }

    return (
    <section className = "comment-meta2">
    <label htmlFor="add-vote" className="label"> Votes: {comment.votes + CommentVoteChange}</label> 
     <button disabled={hasVoted} id="add-vote" value={[comment.comment_id]} onClick={(e) => {handleCommentVote(e, 1)}}> +1 </button>
     <button disabled={hasVoted} id="add-vote" value={[comment.comment_id]} onClick={(e) => {handleCommentVote(e, -1)}}> -1 </button>
     {Error ? <span> Please Try Again </span> : null}
     </section>
     )
}

const ArticleDelete = ({articleData}) => {  
    const [CheckUser, setCheckUser] = useState(false)
    const handleDelete = (e) => {
        e.preventDefault()
        removeArticle(article_id)
        setDeleteArticle(true)
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

const ArticleVote = ({articleData})=> {
    
    const handleVote = (num) => {
        console.log('vote')
        SetError(false)
        setVoteChange((currVote) => { return currVote += num})
        setHasVote(true)
        patchVotes(articleData.article_id, num).catch(()=>{
            SetError(true)
            setHasVote(false)
            setVoteChange((currVote) => { return currVote -= num}); 
        })
        console.log(hasVote)
    }
    return (
        <div>
        <label htmlFor="add-vote" className="label">Votes : { Votes + VoteChange } </label> 
        <button  disabled={hasVote} id="add-vote" onClick={()=>{handleVote(1)}}> +1 </button>
        <button  disabled={hasVote} id="add-vote" onClick={()=>{handleVote(-1)}}> -1 </button>
        {Error ? <span> Please Try Again </span> : null} </div>
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
    }, [article_id, deleteArticle])


    const handleComment = (e) => {
        e.preventDefault()
        postComment(commentText, article_id, User)
        setCommentText('')
        setSubmit(true)
    }

    useEffect(() => {
        getComments(article_id, ChosenSort).then((commentData)=> {
        setCommentData(commentData)
        })
    }, [article_id, ChosenSort, submit])

    return (
        <div>
        {deleteArticle ? <Link to="/">Article Removed - Return Home </Link> : null}
        {isError ? <p> 404 - No found </p> : null}
        <section className="article">
        <section className="metadata">
        <p> Topic: {articleData.topic}</p>
        <p> Author: {articleData.author}</p>
        <p> Published: {new Date(articleData.created_at).toUTCString()}</p>
        {User ? <ArticleVote articleData={articleData} hasVote={hasVote} setHasVote={setHasVote}/> : null }
        </section>
            <h2 className="title">{articleData.title}</h2>
            <ArticleDelete User={User} articleData={articleData}/>
            <p className="article-body">{articleData.body}</p>
        </section>
        {User? <form className="comment-input" onSubmit={handleComment}>
        <label htmlFor="comment-input" className="label"> Add a Comment</label>
        <input required type='text' onChange={((e)=>{
            setCommentText(e.target.value)
            setSubmit(false)
            })} value={commentText} id='comment-input'></input>
        <button type='submit'> Post Comment </button>
        </form> : null }
        <section className ="comments">
            <h3> Comments</h3>
            <select id="sort-by"
                name="sort-by"
                onChange={((e) => {
                    e.preventDefault();
                    setChosenSort(e.target.value);
                })}>
                <option value="created_at" selected> View Most Recent</option>
                <option value="votes" >View Most Popular</option>           
            </select>
            <ul>
            {CommentData.map((comment) => {
                return(
                    <li className="comment-list" key={comment.comment_id}>
                    <p className="comment-meta1">{comment.author}</p>
                    {User? < CommentVote comment={comment} /> : null}
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


