import LoaderSpin from './LoaderSpin';

function LoadingWrapper({ loading, children }) {
    return loading ? <LoaderSpin /> : <>{children}</>;
}

export default LoadingWrapper;
