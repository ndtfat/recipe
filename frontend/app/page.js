import { Header, TopRecipePreview } from '@/components';
import { recipeRequest } from '@/requests';

async function Home() {
    const top1Recipes = await recipeRequest.getTop1Recipes();

    return (
        <div>
            <Header />

            <div className="w-full h-[calc(100vh-110px)] p-[30px]">
                <main className="h-full flex flex-col items-center justify-center bg-black shadow-xl">
                    <TopRecipePreview recipes={top1Recipes} />
                </main>
            </div>
        </div>
    );
}

export default Home;
