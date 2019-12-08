/** @jsx jsx */ jsx;
import { jsx, css } from '@emotion/core'
import * as React from "react";
import { ReactNode, useMemo } from "react";
import { SpinnerCube } from './SpinnerCube';
import { SpinnerCircle } from './SpinnerCircle';

export function Loader<T>({ children, data }: { children: (data: T) => ReactNode, data: T }) {
    const loaded = useMemo(() => {
        return !!data;
    }, [data]);

    return (loaded
        ? <React.Fragment>{children(data)}</React.Fragment>
        : <div css={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <SpinnerCircle />
        </div>)
}