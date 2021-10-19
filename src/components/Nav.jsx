import { useEffect} from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/api";


const Navbar = ({ Topics, setTopics }) => {
    useEffect(() => {
        getTopics().then((topicList) => {
            if(topicList.length >0) {
                setTopics(topicList)
            }
        })
    }, [Topics, setTopics])
    return (
        <nav className = "nav-bar">
        <Link className="nav-list" to="/"> home </Link>
        {Topics.map((topic) => {
            return (
                <Link className="nav-list" key={topic.slug} to ={`/articles/${topic.slug}`}>
                    {topic.slug}
                </Link>
            )
        })}
        </nav>
    )
    
}

export default Navbar;