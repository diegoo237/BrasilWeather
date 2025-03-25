import { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

// Definir o tipo do GeoJSON para TypeScript
interface Feature {
  type: string;
  geometry: {
    type: string;
    coordinates: any[];
  };
  properties: {
    [key: string]: any;
  };
}

interface GeoJSONData {
  type: string;
  features: Feature[];
}

function BrazilMap() {
  const [geojsonData, setGeojsonData] = useState<GeoJSONData | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    fetch("/brazil-states.geojson")
      .then((response) => response.json())
      .then((data) => setGeojsonData(data))
      .catch((error) => console.error("Erro ao carregar o GeoJSON:", error));
  }, []);

  useEffect(() => {
    if (geojsonData) {
      const width = 800;
      const height = 800;

      // Calculando a projeção
      const projection = d3
        .geoMercator()
        .scale(600) // Ajuste de escala
        .center([-55, -15]) // Centraliza o Brasil
        .translate([width / 2, height / 2]); // Posiciona o Brasil no centro do SVG

      const path = d3.geoPath().projection(projection);

      const svg = d3
        .select(svgRef.current)
        .attr("viewBox", `0 0 ${width} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .attr("width", "100%")
        .attr("height", "100%")
        .classed("w-full h-full", true);

      svg
        .append("defs")
        .append("filter")
        .attr("id", "shadow")
        .append("feDropShadow")
        .attr("dx", 0.1)
        .attr("dy", 0.1)
        .attr("stdDeviation", 1)
        .attr("flood-color", "black");

      svg
        .selectAll("path")
        .data(geojsonData.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("fill", "#ccc")
        .attr("stroke", "#333")
        .attr("stroke-width", 1)
        .style("filter", "url(#shadow)") // Aplica o filtro de sombra
        .on("mouseover", function (this: SVGPathElement) {
          d3.select(this).attr("fill", "#ff6347");
        })
        .on("mouseout", function (this: SVGPathElement) {
          d3.select(this).attr("fill", "#ccc");
        });
    }
  }, [geojsonData]);

  return <svg ref={svgRef} className="w-full h-full block"></svg>;
}

export default BrazilMap;
