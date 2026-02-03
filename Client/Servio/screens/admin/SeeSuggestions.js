import { View, StyleSheet } from 'react-native';
import SafeScreen from '../../components/general/SafeScreen';
import ScrollScreen from '../../components/general/ScrollScreen';
import GapContainer from '../../components/general/GapContainer';

function SeeSuggestions(props) {
  return (
    <SafeScreen>
        <ScrollScreen>
            <GapContainer>
                
            </GapContainer>
        </ScrollScreen>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container:{},
})

export default SeeSuggestions;