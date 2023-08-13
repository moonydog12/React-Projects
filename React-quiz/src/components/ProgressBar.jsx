import { useQuiz } from '../contexts/QuizContext'

function ProgressBar() {
  const { index, numQuestions, points, maxPoints, answer } = useQuiz()

  return (
    <header className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  )
}

export default ProgressBar
