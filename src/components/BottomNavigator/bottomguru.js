import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {colors} from '../../utils/colors';

export default function GuruBottomNavigator({state, descriptors, navigation}) {
  return (
    <View style={{backgroundColor: colors.white}}>
      <View style={{padding: 10}}>
        <View
          style={{
            backgroundColor: colors.white,
            flexDirection: 'row',
            height: 80,
            borderRadius: 50,
            zIndex: 1, // Pastikan navigator di atas komponen lain
          }}>
          {state.routes.map((route, index) => {
            const {options} = descriptors[route.key];
            const label = options.tabBarLabel || options.title || route.name;
            const isFocused = state.index === index;

            const onPress = () => {
              console.log(`Navigating to: ${route.name}`); // Debugging
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            let iconName;
            switch (label) {
              case 'Home':
                iconName = isFocused ? 'home' : 'home-outline';
                break;
              case 'HomeGuru':
                iconName = isFocused ? 'grid' : 'grid-outline';
                break;
              case 'TanyaPengawas':
                iconName = isFocused ? 'chatbubble' : 'chatbubble-outline';
                break;
              case 'Profile':
                iconName = isFocused ? 'person' : 'person-outline';
                break;
              default:
                iconName = 'help-circle-outline';
                break;
            }

            return (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityStates={isFocused ? ['selected'] : []}
                onPress={onPress}
                style={{flex: 1}}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 65,
                  }}>
                  <Icon
                    type="ionicon"
                    name={iconName}
                    size={25}
                    color={isFocused ? colors.primary : colors.secondary} // Warna berbeda
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}
