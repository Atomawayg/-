import { GameStateProvider } from './context/GameStateContext'
import { useInputControls } from './hooks/useInputControls'
import { GameScene } from './components/scene/GameScene'
import { GameUI } from './components/ui/GameUI'

function App() {
  const controlsRef = useInputControls()

  return (
    <GameStateProvider>
      <div className="fixed inset-0">
        <GameScene controlsRef={controlsRef} />
        <GameUI controlsRef={controlsRef} />
      </div>
    </GameStateProvider>
  )
}

export default App
