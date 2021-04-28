import styled from "@emotion/styled/macro"
import { CircularProgress } from "@material-ui/core"

const Container = styled.div<{ $height: number }>`
  height: ${({ $height }) => $height}px;
  display: flex;
  align-items: center;
  justify-content: center;
`

interface Props {
  height?: number
}

const Loading = ({ height = 300 }: Props) => {
  return (
    <Container $height={height}>
      <CircularProgress />
    </Container>
  )
}

export default Loading
