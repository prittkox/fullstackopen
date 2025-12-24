const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  return blogs.reduce((prev, current) => {
    return (prev.likes > current.likes) ? prev : current
  })
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const authorCounts = _.countBy(blogs, 'author')

  const authorsArray = _.map(authorCounts, (count, author) => ({
    author: author,
    blogs: count
  }))

  return _.maxBy(authorsArray, 'blogs')
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  
  const blogsByAuthor = _.groupBy(blogs, 'author')

  
  const authorLikes = _.map(blogsByAuthor, (authorBlogs, author) => ({
    author: author,
    likes: _.sumBy(authorBlogs, 'likes')
  }))

  
  return _.maxBy(authorLikes, 'likes')
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes 
}