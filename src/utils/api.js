import axios from 'axios'

const newsApi = axios.create({
    baseURL: 'https://nc-news-kc.herokuapp.com/api'
  });

export const getTopics = async () => {
    const {data} = await newsApi.get('/topics')
    return data.topics
};

export const getArticles = async (topic, ChosenSort, Pagination) => {
    console.log(Pagination)
    let str = '/articles?'
    if (topic) {
        str += `topic=${topic}&`
    }
    str += `sort_by=${ChosenSort}&order=desc&limit=${parseInt(Pagination)}`
    const {data} = await newsApi.get(str)
    return data.articles
};

export const getArticle = async (article_id) => {
    const {data} = await newsApi.get(`/articles/${article_id}`)
    return data.article
}

export const getComments = async (article_id) => {
    const {data} = await newsApi.get(`/articles/${article_id}/comments`)
    return data.comments
}

export const patchVotes = async (article_id) => {
    return newsApi.patch(`/articles/${article_id}`, {"inc_votes": 1})
    .then((res)=> {
        return res.data.votes
    })
}