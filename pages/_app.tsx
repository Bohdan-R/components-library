import Layout from '../components/Layout';
import { Provider } from 'react-redux';
import { setupStore } from '../store/store';
import '../styles/base.scss';

const store = setupStore();

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => <Layout>{page}</Layout>);

  return (
    <>
      <Provider store={store}>
        <div id="portal"></div>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </>
  );
}

export default MyApp;
