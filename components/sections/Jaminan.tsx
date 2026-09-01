import { Kontainer } from "@/components/layout/Kontainer";
import { Muncul } from "@/components/ui/Muncul";
import { jaminan } from "@/content/jaminan";

/**
 * The block a software house usually fills with awards, certifications or a
 * client logo wall. Nayba has none of those, so it states what it will actually
 * be held to instead — which is the question those badges were standing in for.
 */
export function Jaminan() {
  return (
    <section className="py-20 md:py-28 lg:py-36">
      <Kontainer>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
          <div>
            <Muncul jenis="pudar">
              <p className="mata text-biru">Jaminan</p>
            </Muncul>
            <Muncul jenis="naik">
              <h2 className="tampil mt-6 text-bagian">Yang kami pegang</h2>
            </Muncul>
            <Muncul jenis="naik" urutan={1}>
              <p className="mt-6 max-w-md">
                Bukan penghargaan atau sertifikat. Lima hal ini yang bisa kamu
                tagih ke kami, dan semuanya sudah berlaku sejak proyek pertama.
              </p>
            </Muncul>
          </div>

          <dl className="border-t border-garis">
            {jaminan.map((j, i) => (
              <Muncul
                key={j.judul}
                jenis="naik"
                urutan={i % 3}
                durasi={1.1}
                className="border-b border-garis py-7"
              >
                <dt className="tampil flex items-baseline gap-5 text-anak">
                  <span className="text-sm text-biru tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {j.judul}
                </dt>
                <dd className="mt-4 pl-[3.1rem]">{j.isi}</dd>
              </Muncul>
            ))}
          </dl>
        </div>
      </Kontainer>
    </section>
  );
}
