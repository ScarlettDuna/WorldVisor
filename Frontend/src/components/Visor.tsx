import * as Cesium from "cesium";
import { useEffect, useRef } from "react"

Cesium.Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_TOKEN

export default function VisorCesium() {
  console.log(import.meta.env.VITE_CESIUM_TOKEN)
  /**
   * useRef sirve para acceder a un elemento DOM real 
   * Cesium necesita un DOM real para crear el canvas WebGL 
   * React solo te da ese DOM después del render 
   * por eso usamos useRef + useEffect
   */
  const containerRef = useRef<HTMLDivElement | null>(null)

  /*
  useEffect se ejecuta después de que el componente se haya renderizado.

  Esto es importante porque en ese momento el <div> ya existe en el DOM
  y podemos pasárselo a Cesium para que monte el visor.
  */
  useEffect(() => {

    const viewer = new Cesium.Viewer(containerRef.current!, {
      timeline: false, // oculta la barra de tiempo de Cesium
      animation: false, // Oculta los controles de animación del visor
      baseLayerPicker: true // Activa el selector de mapas base, permite cambiar entre distintos mapas
    })
    /*
    Añadimos una entidad al visor.

    Las "Entities" son la forma de alto nivel de añadir objetos al mapa.
    Pueden ser puntos, líneas, polígonos, modelos 3D, etc.
    */

    fetch("http://localhost:5000/cities")
      .then(res => res.json())
      .then(cities => {

        cities.forEach((city: any) => {

          const isHomeCity =
            city.name === "Madrid" ||
            city.name === "London" ||
            city.name === "Chiang Mai"
          const positions = cities.map((city: any) =>
            Cesium.Cartesian3.fromDegrees(city.lon, city.lat)
          )

          viewer.entities.add({
            name: city.name,
            position: Cesium.Cartesian3.fromDegrees(
              city.lon,
              city.lat
            ),

            ...(isHomeCity
              ? {
                point: {
                  pixelSize: 15,
                  color: Cesium.Color.PURPLE
                }
              }
              : {
                point: {
                  pixelSize: 10,
                  color: Cesium.Color.YELLOWGREEN
                }
              })
          })
          viewer.entities.add({
            polyline: {
              positions: positions,
              width: 1.5,
              material: new Cesium.PolylineDashMaterialProperty({
                color: Cesium.Color.YELLOW
              })
            }
          })

        })


      })
    console.log(viewer.entities.values)
    // Eliminar el visor cuando se cierre 
    return () => {
      viewer.destroy();
    }

  }, []) // [] → el efecto solo se ejecuta una vez al montar el componente

  return (
    /*
  Este div es el contenedor donde Cesium montará el visor.

  El tamaño es importante: si el div tiene altura 0,
  el canvas WebGL no será visible.
  */
    <div
      ref={containerRef}
      style={{ width: "80%", height: "80vh" }}
    />
  )
}

