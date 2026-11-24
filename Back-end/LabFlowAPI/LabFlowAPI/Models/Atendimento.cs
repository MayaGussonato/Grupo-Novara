namespace LabFlowAPI.Models
{
    public partial class Atendimento
    {
        public int IdAtendimento { get; set; }
        public string Protocolo { get; set; } = null!;   // gerado pelo banco
        public int IdUsuario { get; set; }
        public int? IdResponsavel { get; set; }
        public int? IdDocumento { get; set; }
        public string Titulo { get; set; } = null!;
        public string Descricao { get; set; } = null!;
        public string Categoria { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Prioridade { get; set; } = null!;
        public string StatusAtendimento { get; set; } = null!;
        public DateTime DataAbertura { get; set; }
        public DateTime? DataAtualizacao { get; set; }
        public DateTime? DataFechamento { get; set; }
    }
}
