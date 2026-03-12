import './App.css'
import "cesium/Build/Cesium/Widgets/widgets.css"
import VisorCesium from './components/Visor'

function App() {

  return (
    <>
      <section id="center">
        <VisorCesium />
        
        
      </section>

      <div className="ticks"></div>
      <section id="spacer">
        <div>
          <h1>El visor del mundo de Arantxa</h1>
        </div>
      </section>
    </>
  )
}

export default App
