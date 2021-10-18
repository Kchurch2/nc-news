import { useEffect, useState} from "react";
import { Link, useParams} from "react-router-dom";
import { getArticles } from "../utils/api";

const Articles = () => {
    const { topic } = useParams()
    const [Articles, setArticles] = useState([{}])
    const [ChosenSort, setChosenSort] = useState("") 
    const [Pagination, setPagination] = useState(10) 
    useEffect(() => {
        getArticles(topic, ChosenSort, Pagination).then((articleList) => {
            if(articleList.length >0) {
            setArticles(articleList)
            } 
        })
    }, [Articles, topic, ChosenSort, Pagination])
    return (
        <div>
        <h2> Articles </h2>
        <section className ="filter-bar"> 
            <select id="filter-pages"
                name="filter-pages"
                onChange={(e) => {
                    e.preventDefault();
                    setPagination(e.target.value);
                }}>
                <option selected value="10" >View 10 per Page</option>      
                <option value="20" >View 20 per Page</option>           
                <option value="">View All</option>
            </select>
            <select id="sort-by"
                name="sort-by"
                onChange={(e) => {
                    e.preventDefault();
                    setChosenSort(e.target.value);
                }}>
                <option value="date" selected>Date</option>
                <option value="comments" >View Most Commented</option>      
                <option value="votes" >View Most Popular</option>           
            </select>
        </section>
        <ul className = "article-list">
        {Articles.map((article) => {
            return (
            <section className ="article-box">    
            <Link to={`/articles/${article.id}`} key={article.id}>
            <h2>{article.title}</h2> 
            <p>{article.topic}</p> 
            <p>{article.created_at}</p> 
            <p>{article.author}</p> 
            <p> Votes: {article.votes}</p> 
            </Link> 
            </section>
            )
        })}
        </ul>
        </div>
    )
    
}

export default Articles;