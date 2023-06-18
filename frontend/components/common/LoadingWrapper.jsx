import LoaderSpin from './LoaderSpin';

function LoadingWrapper({ loading, children }) {
    return loading ? (
        <div className="w-full h-full grid place-items-center">
            <LoaderSpin />
        </div>
    ) : (
        <>{children}</>
    );
}

export default LoadingWrapper;
