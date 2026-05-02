import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GeradorDeSenha {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // Coloque entre as aspas a senha que você quer criar
        String senhaPura = "!@#Marcelo250824"; 
        
        String hashGerado = encoder.encode(senhaPura);
        
        System.out.println("\n========================================");
        System.out.println("SENHA QUE VOCE ESCOLHEU: " + senhaPura);
        System.out.println("COPIE ESTE HASH PARA O NEON: " + hashGerado);
        System.out.println("========================================\n");
    }
}