import { useEffect, useState} from "react";
import { Link, useParams} from "react-router-dom";
import { getArticles } from "../utils/api";

const Articles = ({ Page, setPage }) => {
    const { topic } = useParams()
    const [Articles, setArticles] = useState([{}])
    const [ChosenSort, setChosenSort] = useState("created_at") 
    const [Pagination, setPagination] = useState(10) 


    useEffect(() => {
        getArticles(topic, ChosenSort, Pagination, Page).then((articleList) => {
            if(articleList.length >0) {
            setArticles(articleList)
            } 
        })
    }, [Page, Pagination, ChosenSort, topic])
    return (
        <div>
        <h2> {topic ? topic[0].toUpperCase() + topic.substring(1,): "All"} Articles </h2>
        <section className ="filter-bar"> 
            <select id="filter-pages"
                name="filter-pages"
                onChange={((e) => {
                    setPage(1)
                    e.preventDefault();
                    setPagination(e.target.value);
                })}>
                <option selected value="10" >View 10</option>      
                <option value="20" >View 20</option>           
                <option value="100">View 100</option>
            </select>
            <select id="sort-by"
                name="sort-by"
                onChange={((e) => {
                    setPage(1)
                    e.preventDefault();
                        setChosenSort(e.target.value);
                })}>
                <option value="created_at" selected> View Most Recent</option>
                <option value="comment_count" >View Most Commented</option>      
                <option value="votes" >View Most Popular</option>           
            </select>
        </section>
        <ul className = "article-list">
        {Articles.map((article) => {
            return (
            <section className ="article-box">    
            <Link to={`/article/${article.article_id}`} key={article.id}>
            <h2>{article.title}</h2> 
            <p>{article.topic}</p> 
            <p>{new Date(article.created_at).toUTCString()}</p> 
            <p>{article.author}</p> 
            <p> Votes: {article.votes}, Comments: {article.comment_count}</p> 
            </Link> 
            </section>
            )
        })}
        </ul>
        <button className="pgeBtn" disabled={Page <=1} onClick={() => {setPage((currPage) => currPage -1)}}> Prev Page </button >
        <span> Page {Page} </span>
        <button className="pgeBtn" onClick={() => {setPage((currPage) => currPage +1)}}> Next Page </button >
        </div>
    )
    
}

export default Articles;