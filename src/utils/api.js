import axios from 'axios'

const newsApi = axios.create({
    baseURL: 'https://nc-news-kc.herokuapp.com/api'
  });

export const getTopics = async () => {
    const {data} = await newsApi.get('/topics')
    return data.topics
};

export const getArticles = async (topic, ChosenSort, Pagination, page) => {
    const {data} = await newsApi.get('/articles', {params : {topic: topic, sort_by: ChosenSort, limit : Pagination, page : page}})
    return data.articles
};

export const getArticle = async (article_id) => {
    const {data} = await newsApi.get(`/articles/${article_id}`)
    return data.article
}

export const getComments = async (article_id) => {
    const {data} = await newsApi.get(`/articles/${article_id}/comments?sort_by=votes&limit=1000`)
    return data.comments
}

export const patchVotes = async (article_id) => {
    return newsApi.patch(`/articles/${article_id}`, {"inc_votes": 1})
    .then((res)=> {
        return res.data.votes
    })
}

export const patchCommentVote = async (comment_id) => {
    console.log(comment_id)
    return newsApi.patch(`/comments/${comment_id}`, {"inc_votes": 1})
    .then((res)=> {
        console.log(res.data)
        return res.data.comment
    })
}

export const postComment = async (comment, article_id, User) => {
    console.log(comment, article_id, JSON.parse(User))
    return newsApi.post(`/articles/${article_id}/comments`, ({"username": JSON.parse(User), "body": comment }))
    .then((res) => {
        console.log(res.data)
        return res.data.comment
    })
}

export const getUsers = async () => {
    return newsApi.get('/users')
    .then((res) => {
        console.log(res.data.users)
        return res.data.users
    })
}

export const getUserInfo = async (username) => {
    return newsApi.get(`/users/${username}`)
    .then((res) => {
        return res.data.user
    })
}


export const deleteArticle = async (article_id) => {
    console.log(article_id)
    return newsApi.delete('/api/articles/' + parseInt(article_id))
    .then(res => {
        return res.rows
        }).catch((err) => {
        console.dir(err)
    })
}