import Header from './_sections/Header';
import Department from './_sections/Department';
import Info from './_sections/Info';
import Checks from './_sections/Checks';
import Join from './_sections/Join';

export default function Home() {
    return (
        <>  
        <main className="mx-auto bg-gray-100 flex flex-col gap-10">
            <section id="header" className="pt-20 pb-10 md:py-20 bg-neutral-50 mt-20">
                <div className="container mx-auto">
                    <Header />
                </div>
            </section>
            <section id="department" className="py-10">
                <Department />
            </section>
            <section id="info" className="bg-neutral-50 md:p-20">
                <div className="container mx-auto">
                    <Info />
                </div>
            </section>
            <section id="checks" className="md:px-20 md:py-10">
                <div className="container mx-auto">
                    <Checks />
                </div>
            </section>
            <section id="join" className="md:p-20">
                <div className="container mx-auto">
                    <Join />
                </div>
            </section>
        </main>
        </>
    )
}