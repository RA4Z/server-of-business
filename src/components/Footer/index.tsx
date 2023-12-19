import styles from './Footer.module.scss'
import { memo } from 'react'
import { Divider } from '@mui/material'

import Logo from 'images/white-logo.svg'
import Instagram from 'images/Social/instagram.png'
import Facebook from 'images/Social/facebook.png'
import Twitter from 'images/Social/twitter.png'
import Youtube from 'images/Social/youtube.png'

function Footer() {
    return (
        <div className={styles.container}>
            <div className={styles.background}>
                <div className={styles.server}>
                    <img src={Logo} alt='Logo da Server of Business' className={styles.background__logotipo} />
                    <div className={styles.background__dev}>
                        <button>Server of Business</button>
                        <a href='https://github.com/RA4Z'>Desenvolvido e prototipado por Robert Aron Zimmermann</a>
                        <p>robertz.raz@gmail.com</p>
                    </div>
                </div>
                <div className={styles.atribuicoes}>
                    <li style={{ listStyle: 'none', textAlign: 'center', color: '#64CCC5' }}>Direitos de ícones e imagens:</li>
                    <a href="https://www.flaticon.com/br/autores/freepik" ><li>Ícones criados por Freepik - Flaticon</li></a>
                    <a href="https://br.freepik.com/fotos-gratis/mulher-verificar-a-calendario_2753814.htm" target="_blank" rel="noreferrer"><li>Imagem de rawpixel.com no Freepik</li></a>
                    <a href="https://br.freepik.com/fotos-gratis/pessoas-negocio-apertar-mao-junto_2753723.htm" target="_blank" rel="noreferrer"><li>Imagem de rawpixel.com no Freepik</li></a>
                    <a href="https://br.freepik.com/fotos-gratis/pessoas-negocio-apertar-mao-em-um-sala-reuniao_2770460.htm" target="_blank" rel="noreferrer"><li>Imagem de rawpixel.com no Freepik</li></a>
                    <a href="https://br.freepik.com/fotos-gratis/grupo-de-pessoas-diversas-tendo-uma-reuniao-de-negocios_2894621.htm" target="_blank" rel="noreferrer"><li>Imagem de rawpixel.com no Freepik</li></a>
                    <a href="https://br.freepik.com/fotos-gratis/homem-sorridente-de-tiro-medio-no-armazem_21251335.htm" target="_blank" rel="noreferrer"><li>Imagem de freepik.com no Freepik</li></a>
                    <a href="https://br.freepik.com/fotos-gratis/diferentes-ocupacoes-de-mulheres-jovens_11600063.htm" target="_blank" rel="noreferrer"><li>Imagem de gpointstudio no Freepik</li></a>
                    <a href="https://br.freepik.com/fotos-gratis/alegre-jovem-empresario-caucasiano_6514541.htm" target="_blank" rel="noreferrer"><li>Imagem de drobotdean no Freepik</li></a>
                    <a href="https://br.freepik.com/fotos-gratis/mulher-ocupada-fazendo-muitas-coisas-ao-mesmo-tempo_865252.htm" target="_blank" rel="noreferrer"><li>Imagem de pressfoto no Freepik</li></a>
                </div>
            </div>
            <div className={styles.social}>
                <img src={Instagram} alt='Logotipo do Instagram' />
                <img src={Facebook} alt='Logotipo do Facebook' />
                <img src={Twitter} alt='Logotipo do Twitter' />
                <img src={Youtube} alt='Logotipo do Youtube' />
            </div>
            <Divider style={{ background: 'white', margin: 10 }} />
            <p>Server of Business - Todos os direitos reservados</p>
        </div>
    )
}
export default memo(Footer)