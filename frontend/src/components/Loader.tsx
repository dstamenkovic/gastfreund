import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

type Props = {
  open: boolean
}

const Loader = ({ open }: Props) => (
  <Backdrop
    open={open}
    sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1, backgroundColor: 'transparent' }}
  >
    <CircularProgress color="primary" />
  </Backdrop>
)

export default Loader
