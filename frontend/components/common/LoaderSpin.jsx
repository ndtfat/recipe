import block from 'module-clsx';
import styles from '@/styles/loaderSpin.module.scss';
const clsx = block(styles);

function LoaderSpin() {
    return (
        <div className="w-full h-full grid place-items-center">
            <div className={clsx('loader')}></div>
        </div>
    );
}

export default LoaderSpin;
