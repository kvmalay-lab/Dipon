import { useEffect, useState } from 'react';
import PageHero from '../components/PageHero';
import SectionHeader from '../components/SectionHeader';
import LeaderCard from '../components/LeaderCard';
import CTABanner from '../components/CTABanner';

export default function Leadership() {
  const [founders, setFounders] = useState<any[]>([]);
  const [governing, setGoverning] = useState<any[]>([]);
  const [advisors, setAdvisors] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/v1/leadership')
      .then(res => res.json())
      .then(json => {
        if (json.success && json.data && json.data.length > 0) {
          const list = json.data;
          
          // Sort by display order
          list.sort((a: any, b: any) => (a.displayOrder || 0) - (b.displayOrder || 0));

          // Map biography to bio for card prop
          const mappedList = list.map((item: any) => ({
            ...item,
            bio: item.biography
          }));

          setFounders(mappedList.filter((item: any) => item.department === 'Board' || item.department === 'Executive'));
          setGoverning(mappedList.filter((item: any) => item.department === 'Governing Body'));
          setAdvisors(mappedList.filter((item: any) => item.department === 'Advisory Board' || item.department === 'Advisors'));
        } else {
          // Fallback static leadership
          setFounders([
            { name: "Mahmud Hasan", designation: "Founder & Chairman", bio: "Founder of Dipon Gas who transformed the pipeline construction business into a multi-sector group of high repute under his leadership." },
            { name: "Rashed Mahmud", designation: "Managing Director & CEO", bio: "Successfully spearheaded and managed to expand the business arena of Dipon Group into a multi-dimensional and multi-faceted business organization thereby accelerating growth to help scale new heights and cross new horizons." },
            { name: "Yaseer Mahmud", designation: "Director", bio: "Led new initiatives of Dipon Group like real estate development and established it as a reliable, trustworthy and committed company in the Bangladesh Real Estate Market." }
          ]);
          setGoverning([
            { name: "Aarouni Verma", designation: "Governing Body Member", bio: "Graduate from MNIT Jaipur with PG in International Trade and garnered experience with conglomerates like TATA and Reliance in different sectors." },
            { name: "Uttam Singh", designation: "Governing Body Member", bio: "Graduate from MNIT Jaipur with PG in Adv Construction Management, former SVP of Wilbur Smith Associates, has vast experience in Energy and Infrastructure Projects." },
            { name: "Syed Javed Iqbal", designation: "Governing Body Member", bio: "MBA with vast experience in investment banking, Former Head of investment division of IPDC, Country Head of Khulna Power Company Ltd." }
          ]);
          setAdvisors([
            { name: "Dr. A.K. Balyan", designation: "Independent Director - Dipon India", bio: "M. Tech from IIT-Delhi, PhD from Germany, Former MD & CEO of Petronet LNG Ltd, Director Incharge – HR, Business Development & Joint Ventures in ONGC Ltd." },
            { name: "S. C. Verma", designation: "Independent Director - Dipon India", bio: "M.Sc & A.I.S.M from IIT Dhanbad, India, Former Regional Director, Dept. of Atomic Energy, India and Adviser to the Chairman, Reliance Industries Limited." },
            { name: "Shahidul Abedin", designation: "Advisory Board Member", bio: "Mechanical Engineer with four decades of experience in the Gas sector as former MD of Bangladesh Gas Field Company Ltd., Bakhrabad Gas System Ltd. and Director of Petrobangla." }
          ]);
        }
      })
      .catch(() => {
        // Fallback static leadership
        setFounders([
          { name: "Mahmud Hasan", designation: "Founder & Chairman", bio: "Founder of Dipon Gas who transformed the pipeline construction business into a multi-sector group of high repute under his leadership." },
          { name: "Rashed Mahmud", designation: "Managing Director & CEO", bio: "Successfully spearheaded and managed to expand the business arena of Dipon Group into a multi-dimensional and multi-faceted business organization thereby accelerating growth to help scale new heights and cross new horizons." },
          { name: "Yaseer Mahmud", designation: "Director", bio: "Led new initiatives of Dipon Group like real estate development and established it as a reliable, trustworthy and committed company in the Bangladesh Real Estate Market." }
        ]);
        setGoverning([
          { name: "Aarouni Verma", designation: "Governing Body Member", bio: "Graduate from MNIT Jaipur with PG in International Trade and garnered experience with conglomerates like TATA and Reliance in different sectors." },
          { name: "Uttam Singh", designation: "Governing Body Member", bio: "Graduate from MNIT Jaipur with PG in Adv Construction Management, former SVP of Wilbur Smith Associates, has vast experience in Energy and Infrastructure Projects." },
          { name: "Syed Javed Iqbal", designation: "Governing Body Member", bio: "MBA with vast experience in investment banking, Former Head of investment division of IPDC, Country Head of Khulna Power Company Ltd." }
        ]);
        setAdvisors([
          { name: "Dr. A.K. Balyan", designation: "Independent Director - Dipon India", bio: "M. Tech from IIT-Delhi, PhD from Germany, Former MD & CEO of Petronet LNG Ltd, Director Incharge – HR, Business Development & Joint Ventures in ONGC Ltd." },
          { name: "S. C. Verma", designation: "Independent Director - Dipon India", bio: "M.Sc & A.I.S.M from IIT Dhanbad, India, Former Regional Director, Dept. of Atomic Energy, India and Adviser to the Chairman, Reliance Industries Limited." },
          { name: "Shahidul Abedin", designation: "Advisory Board Member", bio: "Mechanical Engineer with four decades of experience in the Gas sector as former MD of Bangladesh Gas Field Company Ltd., Bakhrabad Gas System Ltd. and Director of Petrobangla." }
        ]);
      });
  }, []);

  return (
    <div>
      <PageHero
        title="Our Leadership"
        subtitle='"There is no investment you can make which will pay you so well as the effort to scatter sunshine and good cheer through your establishment."'
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop"
      />

      {/* Founders Section */}
      <section className="py-24 bg-white">
        <div className="container-max">
          <SectionHeader
            overline="Founders"
            title="Executive Leadership"
            subtitle="The core visionaries who established and expanded the Dipon Group across multiple dimensions."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {founders.map((leader, i) => (
              <LeaderCard key={i} {...leader} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Governing Section */}
      <section className="py-24 bg-[var(--color-bg-muted)]">
        <div className="container-max">
          <SectionHeader
            overline="Governance"
            title="Governing Body"
            subtitle="Leading with specialized technical and trade backgrounds to ensure operational excellence."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {governing.map((leader, i) => (
              <LeaderCard key={i} {...leader} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Section */}
      <section className="py-24 bg-white">
        <div className="container-max">
          <SectionHeader
            overline="Advisors"
            title="Board of Advisors"
            subtitle="Independent directors and veterans providing strategic direction and regulatory counsel."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advisors.map((leader, i) => (
              <LeaderCard key={i} {...leader} index={i} />
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
