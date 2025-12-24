const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const blogs = [
    { _id: "1", title: "React patterns", author: "Michael Chan", likes: 7 },
    { _id: "2", title: "Go To Statement", author: "Edsger W. Dijkstra", likes: 5 },
    { _id: "3", title: "Canonical string", author: "Edsger W. Dijkstra", likes: 12 }
  ]

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    assert.strictEqual(result, 24)
  })

  test('of empty list is zero', () => {
    assert.strictEqual(listHelper.totalLikes([]), 0)
  })
})

describe('favorite blog', () => {
  const blogs = [
    { title: "A", author: "X", likes: 10 },
    { title: "B", author: "Y", likes: 15 },
    { title: "C", author: "Z", likes: 12 }
  ]

  test('finds the blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogs)
    assert.deepStrictEqual(result, blogs[1])
  })
})

describe('most blogs', () => {
  const blogs = [
    { author: "Michael Chan", likes: 1 },
    { author: "Robert C. Martin", likes: 1 },
    { author: "Robert C. Martin", likes: 1 }
  ]

  test('finds the author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)
    assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 2 })
  })
})

describe('most likes', () => {
  const blogs = [
    { author: "Michael Chan", likes: 7 },
    { author: "Edsger W. Dijkstra", likes: 5 },
    { author: "Edsger W. Dijkstra", likes: 12 },
    { author: "Robert C. Martin", likes: 10 }
  ]

  test('finds the author with most total likes', () => {
    const result = listHelper.mostLikes(blogs)
    assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 })
  })
})