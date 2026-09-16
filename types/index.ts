export type Difficulty = 1 | 2 | 3 | 4 | 5

export type ContentMode = "exam" | "trailhead" | "accreditation"

export interface Option {
  key: string
  text: string
}

export interface Question {
  id: string
  stem: string
  options: Option[]
  correct: string
  explanation: string
  distractors: Record<string, string>
  citation_url: string
  verified_against_release: string
  tags: string[]
  difficulty: Difficulty
  flagged_for_review?: boolean
}

export interface TopicQuestions {
  certification: string
  topic: string
  topicLabel: string
  difficulty: Difficulty
  questions: Question[]
}

export interface Topic {
  id: string
  label: string
  description: string
  questionCount: number
  difficulty: Difficulty
  tags: string[]
}

export interface Certification {
  id: string
  label: string
  shortLabel: string
  description: string
  mode: ContentMode
  examFormat?: {
    questionCount: number
    timeMinutes: number
    passingScore: number
  }
  domains: { label: string; weight: number }[]
  topics: Topic[]
  color: "teal" | "gold"
  examGuideUrl: string
}

export interface SessionAnswer {
  questionId: string
  chosenKey: string
  correct: boolean
  timeSpentSeconds?: number
}

export interface QuizSession {
  certId: string
  topicId: string
  answers: SessionAnswer[]
  startedAt: number
  completedAt?: number
}

export interface TopicStats {
  certId: string
  topicId: string
  totalAttempted: number
  totalCorrect: number
  lastAttempted: string
  accuracy: number
}
