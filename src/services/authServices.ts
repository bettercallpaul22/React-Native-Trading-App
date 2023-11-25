import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../../model';


const USER_ID_KEY = 'userId';
const USER = 'username';
const USER_TOKEN_KEY = 'userToken';

export class AuthService {
  async setUserId(userId: string) {
    try {
      await AsyncStorage.setItem(USER_ID_KEY, userId);
    } catch (e) {
      console.log('error setting user id', e)
    }

  }

  async getUserId() {
    try {
      const user_id = await AsyncStorage.getItem(USER_ID_KEY);
      if (user_id !== null) {
        return user_id
      }
    } catch (e) {
      console.log('error getting user id', e)

    }
  }


  // set user token
  async setUserToken(userToken: string) {
      try {
        await AsyncStorage.setItem(USER_TOKEN_KEY, userToken);
      } catch (e) {
      console.log('error settin user token', e)
        
      }
  }

  // get user token
  async getUserToken() {
    try {
      const token = await AsyncStorage.getItem(USER_TOKEN_KEY);
      if (token !== null) {
        return token
      }
    } catch (e) {
      console.log('error getting user token', e)

    }
  }


  async setUser(user: User) {
    try {
      const user_value = JSON.stringify(user);
      await AsyncStorage.setItem(USER, user_value);
    } catch (e) {
      // saving error
    }
  }

  async getUser() {
    try {
      const user_value = await AsyncStorage.getItem(USER);
      return user_value != null ? JSON.parse(user_value) : null;
    } catch (e) {
      // error reading value
    };
  }


  clearUser() {
    async () => {
      try {
        await AsyncStorage.removeItem(USER)
        await AsyncStorage.removeItem(USER_ID_KEY)
        await AsyncStorage.removeItem(USER_TOKEN_KEY)
      } catch (e) {
        // remove error
      }
    }

  }

}