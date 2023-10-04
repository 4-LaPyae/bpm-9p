import {forwardRef, useState} from 'react';
import {DateRangePicker} from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import './style.css';
import {Box, Button, Stack} from '@mui/material';
import MkButton from '../../assets/theme/MkButton';

const SimpleDateRangePicker = forwardRef(
    (
        {
            handleDateRange,
            show = false,
            close = () => {
                void 0;
            },
        },
        ref
    ) => {
        const [selectedDateRange, setSelectedDateRange] = useState({
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        });

        const handleSelect = (ranges) => {
            setSelectedDateRange(ranges.selection);
            handleDateRange(ranges.selection);
        };

        const handleClose = () => {
            handleDateRange(selectedDateRange);
            close();
        };

        return (
            <Stack
                direction={'column'}
                sx={{display: show ? '' : 'none'}}
            >
                <DateRangePicker
                    onChange={handleSelect}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={2}
                    ranges={[selectedDateRange]}
                    direction="horizontal"
                />
                <Box
                    sx={{
                        width: '100%',
                        height: '60px',
                        background: '#000',
                        paddingRight: 1,
                        borderTop: '1px solid',
                    }}
                >
                    <Stack
                        direction={'row'}
                        justifyContent={'end'}
                        mt={1}
                    >
                        <MkButton
                            variant="outlined"
                            mkcolor="linear-gradient(310deg, #2152ff, #02c6f3)"
                            onClick={handleClose}
                            color={'black'}
                        >
                            Done
                        </MkButton>
                    </Stack>
                </Box>
            </Stack>
        );
    }
);

export default SimpleDateRangePicker;
