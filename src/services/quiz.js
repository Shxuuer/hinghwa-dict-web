import request from '@/utils/request'

/**
 * QZ0201 搜索指定的测试
 * @param key 搜索关键词
 * @returns {Promise<unknown>}
 */
export async function searchQuiz (key) {
  return await request.get('/quizzes', { keywords: key })
}
