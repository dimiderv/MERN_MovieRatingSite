import React from 'react';
import ReactLoading from 'react-loading'
const Loading = () => {
    return (
        // could add content class here

        <div className={'mt-4'}>
            <div style={{height:"70vh"}} className={'centerItems'}>
                <ReactLoading

                    type={"bars"}

                    color={"#03fc4e"}

                    height={100}

                    width={100}

                />
            </div>
        </div>
    );
};

export default Loading;