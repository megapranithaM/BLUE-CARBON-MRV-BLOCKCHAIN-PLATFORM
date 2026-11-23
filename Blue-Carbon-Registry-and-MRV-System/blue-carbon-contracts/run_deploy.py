import subprocess
import os

def run_deploy():
    result = subprocess.run(['npx', 'hardhat', 'run', 'scripts/deploy.mjs', '--network', 'localhost'], 
                           cwd='c:/Users/megam/OneDrive/Desktop/block/Blue-Carbon-Registry-and-MRV-System/blue-carbon-contracts',
                           capture_output=True, text=True, shell=True)
    with open('deploy_result.txt', 'w') as f:
        f.write(result.stdout)
        f.write("\nERRORS:\n")
        f.write(result.stderr)

if __name__ == "__main__":
    run_deploy()
