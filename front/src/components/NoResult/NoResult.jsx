import Lottie from "react-lottie";
import noresult from '../../../src/lotties/noresult.json';
import styles from './NoResult.module.scss';
import { Text } from "@chakra-ui/react";

const NoResult = ({ text }) => {
    return <div className={styles.container}>
        <Text fontSize='2xl'>{text}</Text>
        <Lottie
            options={{
                loop: true,
                autoplay: true,
                animationData: noresult,
                rendererSettings: {
                    preserveAspectRatio: "xMidYMid slice"
                }
            }}
            height={200}
            width={200}
        />
    </div>
}
export default NoResult;