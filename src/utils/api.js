import axios from 'axios'

const newsApi = axios.create({
    baseURL: 'https://nc-news-kc.herokuapp.com/api'
  });

export const getTopics = async () => {
    const {data} = await newsApi.get('/topics')
    return data.topics
};

export const getArticles = async (topic, ChosenSort, Pagination) => {
    let str = '/articles'
    if (topic) {
        console.log(topic)
        str += `?topic=${topic}`
    }
    str += `?sort_by=${ChosenSort}&order=desc&limit=${Pagination}`
    const {data} = await newsApi.get(str)
    return data.articles
};