import {createAsyncThunk} from '@reduxjs/toolkit';
import useFetch from '../../app/hooks';

export const updatePrintSetting = createAsyncThunk(
    'updatePrintSetting/updatePrintSetting',
    async ({data}, {getState}) => {
        const {token, user} = getState().loginInfo;
        const result = useFetch({
            url: `updateSetting?user_id=${user._id}`,
            method: 'POST',
            token: token,
            data: data,
        });
        return result;
    }
);
