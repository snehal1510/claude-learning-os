"use server"

export async function saveAnswer(
  _questionId: string,
  _certificationId: string,
  _topicId: string,
  _chosenKey: string,
  _correct: boolean,
  _timeSpentSeconds?: number
) {
  // No server persistence — progress is stored in localStorage
  return { ok: true }
}
