import Header from './_sections/Header';
import Department from './_sections/Department';
import Info from './_sections/Info';
import Checks from './_sections/Checks';
import Join from './_sections/Join';

export default function Home() {
    return (
        <>  
        <main className="mx-auto bg-gray-100 flex flex-col gap-10">
            <section id="header" className="py-20 px-20 bg-neutral-50 mt-0 md:mt-20">
                <div className="container mx-auto">
                    <Header />
                </div>
            </section>
            <section id="department" className="pt-10 pb-15">
                <Department />
            </section>
            <section id="info" className="bg-neutral-50 py-20 px-20">
                <div className="container mx-auto">
                    <Info />
                </div>
            </section>
            <section id="checks" className="pb-20 px-20">
                <div className="container mx-auto">
                    <Checks />
                </div>
            </section>
            <section id="join" className="pb-20 px-20">
                <div className="container mx-auto">
                    <Join />
                </div>
            </section>
        </main>
        </>
    )
}