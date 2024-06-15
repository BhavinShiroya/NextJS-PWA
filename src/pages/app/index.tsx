import {
  Box,
  Divider,
  InputAdornment,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { ShellTitle } from 'components'
import { AppLayout } from 'components/layout'
import CallIcon from '@mui/icons-material/Call'
import WhatsAppIcon from '@mui/icons-material/WhatsApp'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useState } from 'react'
import { getUserData } from 'helpers/getUserData'

export default function AppIndex() {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])

  console.log(filteredData)

  useEffect(() => {
    async function fetchData() {
      // Fetch data from Google Sheets on component mount
      const sheetData = await getUserData()
      setData(sheetData)
      setFilteredData(sheetData)
    }
    fetchData()
  }, [])

  useEffect(() => {
    // Filter data based on search term
    const filtered = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === 'string' &&
          value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    setFilteredData(filtered)
  }, [searchTerm, data])

  return (
    <>
      <ShellTitle title="Home" />
      <Paper>
        <Box m={2} pt={2} pb={1}>
          <TextField
            id="input-with-icon-textfield"
            label="Search"
            placeholder="Search Car, flat, mobile, name"
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{ width: '100%' }}
            variant="standard"
          />
        </Box>
      </Paper>
      {filteredData.map((item: any) => (
        <Paper sx={{ mb: 1 }} key={item.vehicleNo}>
          <Box p={2}>
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h6">{item.ownerName}</Typography>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h6">{item.vehicleNo}</Typography>
                <Typography variant="caption">{item.vehicleCompany}</Typography>
              </Box>
            </Box>
            <Divider />
            <Box mt="10px" display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">Flat No</Typography>{' '}
              <Typography variant="body1">{item.flatNo}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="subtitle1">Mobile No</Typography>{' '}
              <Typography variant="body1">{item.ownerPhoneNo}</Typography>
            </Box>
            <Divider />
            <Box mt="10px" display="flex" justifyContent="right" gap="60px">
              <a href={'tel:' + item.ownerPhoneNo}>
                <CallIcon color="warning" />{' '}
              </a>
              <WhatsAppIcon color="success" />
            </Box>
          </Box>
        </Paper>
      ))}
      {/* <Paper sx={{ mb: 1 }}>
        <Box p={2}>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h6">Bhavin Shiroya</Typography>
              <Typography variant="caption">{'ભાવિન શિરોયા'}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h6">GJ01RX9478</Typography>
              <Typography variant="caption">{'Creta'}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box mt="10px" display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Flat No</Typography>{' '}
            <Typography variant="body1">A1-601</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Mobile No</Typography>{' '}
            <Typography variant="body1">9978398984</Typography>
          </Box>
          <Divider />
          <Box mt="10px" display="flex" justifyContent="right" gap="60px">
            <CallIcon color="warning" />
            <WhatsAppIcon color="success" />
          </Box>
        </Box>
      </Paper>
      <Paper>
        <Box p={2}>
          <Box display="flex" justifyContent="space-between">
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h6">Bhavin Shiroya</Typography>
              <Typography variant="caption">{'ભાવિન શિરોયા'}</Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography variant="h6">GJ01RX9478</Typography>
              <Typography variant="caption">{'Creta'}</Typography>
            </Box>
          </Box>
          <Divider />
          <Box mt="10px" display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Flat No</Typography>{' '}
            <Typography variant="body1">A1-601</Typography>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="subtitle1">Mobile No</Typography>{' '}
            <Typography variant="body1">9978398984</Typography>
          </Box>
          <Divider />
          <Box mt="10px" display="flex" justifyContent="right" gap="60px">
            <CallIcon color="warning" />
            <WhatsAppIcon color="success" />
          </Box>
        </Box>
      </Paper> */}
    </>
  )
}

AppIndex.layout = AppLayout
