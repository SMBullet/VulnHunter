from ssh_helper import execute_command_on_kali

def run_nikto(ip):
    command = f"echo n | nikto -h http://{ip} -nointeractive"  # Replace with the Nikto command of your choice
    output, error = execute_command_on_kali(command)
    
    if output:
        print(f"Nikto Output:\n{output}")
    if error:
        print(f"Nikto Error:\n{error}")
