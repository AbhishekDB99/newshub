import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    articles = []
    constructor() {
        super();
        console.log("Hello I am constructor from news component");
        this.state = {
            articles: [],
            loading: false,
            page:1
        }

    }
    async componentDidMount(){
        let url= "https://newsapi.org/v2/top-headlines?country=in&apiKey=f8d47545976b4d2ea49025701e51b07a";
        let data = await fetch(url);
        let parsedData = await data.json()
       this.setState({articles:parsedData.articles, totalArticles:parsedData.totalResults})
    }
    handleNextClick = async() =>{
        console.log("next")
        if (this.state.page + 1> Math.ceil(this.state.totalArticles/20)) {
            
        }
        else
        {
        let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=f8d47545976b4d2ea49025701e51b07a&page=${this.state.page+1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()
       this.setState({
           articles:parsedData.articles,
           page :this.state.page+1
        })
        }
    }

    handlePrevClick = async() =>{
        console.log("previous")
        let url= `https://newsapi.org/v2/top-headlines?country=in&apiKey=f8d47545976b4d2ea49025701e51b07a&page=${this.state.page-1}&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json()
       this.setState({
           articles:parsedData.articles,
           page :this.state.page-1
        })
    }
    render() {
        return (
            <div className='container my-3'>
                <h1 className="text-center">NewsApp - Top headlines</h1>
                <div className='row'>
                    {this.state.articles.map((element) => {
                        return <div className='col-md-4'  key={element.url}>
                            <NewsItem title={element.title?element.title.slice(0,45):""} description={element.description? element.description.slice(0,88):""} imageUrl={!element.urlToImage?"https://st1.bollywoodlife.com/wp-content/uploads/2022/01/FotoJet-2022-01-04T211525.475-600x315.jpg":element.urlToImage} newsUrl={element.url} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
                <button type="button" disabled={this.state.page + 1> Math.ceil(this.state.totalArticles/20)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div>
            </div>
        )
    }
}

export default News