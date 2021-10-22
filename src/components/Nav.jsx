import { useEffect} from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/api";


const Navbar = ({ Topics, setTopics, setPage}) => {
    useEffect(() => {
        getTopics().then((topicList) => {
            if(topicList.length >0) {
                setTopics(topicList)
            }
        })
    }, [setTopics])
    return (
        <nav className = "nav-bar">
        <Link onClick={()=>{setPage(1)}} className="nav-list" to="/"> home </Link>
        {Topics.map((topic) => {
            return (
                <Link onClick={()=>{setPage(1)}}className="nav-list" to ={`/articles/${topic.slug}`}>
                    {topic.slug}
                </Link>
            )
        })}
        <Link className="nav-list" to="/users"> authors </Link>
        </nav>
    )
    
}

export default Navbar;