import block from 'module-clsx';

import styles from '@/styles/loader.module.scss';
const clsx = block(styles);

function Loader() {
    return (
        <div className="w-screen h-screen grid place-items-center">
            <div className={clsx('loader')}></div>
        </div>
    );
}

export default Loader;
