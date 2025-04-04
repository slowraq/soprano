import {Suspense} from 'react';
import AppRouter from '@/app/router/ui/AppRouter';
import {StoreProvider} from "@/app/providers/StoreProvider";

function App() {


    return (
        <StoreProvider>
                <Suspense fallback="">
                    <AppRouter />
                </Suspense>
        </StoreProvider>
    );
}

export default App;
