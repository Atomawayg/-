import { Billboard, Text } from '@react-three/drei'

interface BuildingLabelProps {
  text: string
  height: number
}

export function BuildingLabel({ text, height }: BuildingLabelProps) {
  return (
    <Billboard position={[0, height + 2.5, 0]}>
      <Text
        font="/fonts/WorkSans-Bold.ttf"
        fontSize={1.4}
        color="#1f2430"
        outlineWidth={0.06}
        outlineColor="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </Billboard>
  )
}
